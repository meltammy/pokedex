import './App.css';
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from "axios";
import PokemonList from "./PokemonList"

const Container = styled.div`
width: 100%;
min-height: 99vh;
height: fit-content;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Header = styled.div`
  max-width:100%;
  width: 100%;
  background-color: red;
  display: flex;
  height: ${({ open }) => (open ? '15vh' : '50vh')};
  border-bottom: 2vw black solid;
  transition: 0.7s;
`

const Footer = styled.div`
  max-width:100vw;
  width:100%;
  background-color: white;
  height: ${({ open }) => (open ? '8vh' : '50vh')};
  border-top: 2vw black solid;
  transition: 0.7s;
`

const PokeButton = styled.button`
  border-radius: 100vh;
  width: 24vh;
  height: 24vh;
  left: 44vw;
  top: ${({ open }) => (open ? '2vh' : '38vh')};
  position: absolute;
  display:  flex;
  align-self: center;
  justify-self: center;
  border: 1.5vw black solid;
  background-color: rgba(255, 255, 255);
  transition: 0.7s;
  outline: none;
  :hover{

  }
  :focus{
  }
`

const ButtonDetail = styled.div`
width: 100%;
height: 100%;
border-radius: 100px;
background-color: transparent;
box-shadow: inset 0px 0 16px 2px #00000066;
border: 8px #00000012 solid;
:active{
  box-shadow: inset 0px 0 16px 6px #00000066;
}
`

const MainContainer = styled.div`
transition: 0.7s;
min-height: ${({ open }) => (open ? '76vh' : '0')};
height: ${({ open }) => (open ? 'fit-content' : '0vh')};
display:flex;
padding-top: ${({ open }) => (open ? '13vh' : '0')};
flex-wrap: wrap;
max-width: 100%;
overflow: auto;
justify-content: center;
`

const PokePhoto = styled.img`
width: ${({ open }) => (open ? '15vw' : '0')};
height: ${({ open }) => (open ? '15vw' : '0')};
transition: 0.7s;
`

const PokeCard = styled.div`
display: ${({ open }) => (open ? 'none' : 'flex')};
width: 20%;
transition: 0.7s;
/* border: 1px black solid; */
margin: 1%;
padding: 1%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 100%;
`

const PokeName = styled.p`
display: ${({ open }) => (open ? 'none' : 'flex')};
font-size: 2em;
font-variant: petite-caps;
`
const Moldura = styled.div`
display: ${({ open }) => (open ? 'none' : 'flex')};
width: 95%;
transition: 0.7s;
border-radius: 34%;
margin: 1%;
padding: 1%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: inset 0 0 20px 20px white;
background-color: #0000001c;
`


function App() {
  const [open_, setOpen_] = useState(false)
  const [pokemon, setPokemon] = useState([])
  const [curentPageUrl, setCurentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    let pokeAux = []
    console.log(typeof pokeAux)
    setLoading(true)
    axios.get(curentPageUrl).then(res => {
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      res.data.results.map(p => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${p.name}`).then(
          res => {
            let aux = {
              id: res.data.id,
              name: res.data.name,
              photo: `https://pokeres.bastionbot.org/images/pokemon/${res.data.id}.png`,
              type: res.data.types.map((poke) => {
                return (
                  poke.type.name
                )
              })
            }
            pokeAux.push(aux)
            setPokemon(pokeAux)
            setLoading(false)
          }
        )
      })
      setLoading(false)
      console.log(res.data.results)
    })

  }, [curentPageUrl])


  if (loading) return "Loading..."

  const openPoke = () => {
    setOpen_(!open_)
    console.log(typeof pokemon)
    console.log(pokemon.map(p => { return (p) }))
  }

  return (
    <Container>
      <Header open={open_}>
        <PokeButton open={open_} onClick={openPoke}>
          <ButtonDetail></ButtonDetail>
        </PokeButton>
      </Header>
      <MainContainer open={open_}>
        {(loading) ? (<></>) : (
          pokemon.map(poke => {
            return (
              <PokeCard>
                <Moldura>
                  <PokePhoto open={open_} src={poke.photo} />
                </Moldura>

                <PokeName>{poke.name}</PokeName>
              </PokeCard>
            )
          })
        )}
      </MainContainer>
      <Footer open={open_}></Footer>
    </Container>
  );
}

export default App;
