import Image from 'next/image'
import React from 'react'

const MovieCard = ({ title, year, posterImage, type, actors, rate, plot }) => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-xl hover:cursor-pointer">
            <Image className="w-full" src={posterImage} alt={title} height={500} width={500} />
            <div className="px-6 py-4">
                <h1 className="font-bold text-xl mb-2">{title}</h1>
                {type && <p>{`Type: ${type}`}</p>}
                {rate && <p>{`Rate (IMD): ${rate}`}</p>}
                {year && <p>{`Release year: ${year}`}</p>}
                {actors && <p>{`Cast: ${actors}`}</p>}
                {plot && <p>{`Plot: ${plot}`}</p>}
            </div>
        </div>
    )
}

export default MovieCard
