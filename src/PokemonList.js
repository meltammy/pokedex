import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function PokemonList({ pokemon }) {
    return (
        <div>
            {pokemon.name}
        </div>
    )
}
