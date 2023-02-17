import {useState, useEffect} from 'react';

const Card = ({id, onClick}) => {
    const [data, setData] = useState({
        id: id,
        name: '',
        src: ''
    })

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const pokemonData = await response.json();
                setData({
                    id: id,
                    name: pokemonData.name,
                    src: (pokemonData.sprites.front_default ? pokemonData.sprites.front_default : pokemonData.sprites.other['official-artwork'].front_default)
                })
            } catch (e) {
                console.log("Error: ", e)
            }
        }

        fetchData()
    }, [id])

    return (
        <div onClick={onClick} id={id} className="card">
            <img className='pokemon-img' loading="lazy" alt={data.src ? "pokemon sprite" : ""} src={data.src}/>
            <h4 className='pokemon-name'>{data.name}</h4>
        </div>
    )
}

export default Card