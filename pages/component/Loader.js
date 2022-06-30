import React from 'react'

export default function Loader({ value}) {
    return (
 
        <div className="progress pg-height sticky-load">
            <div className="progress-bar bg-success progresss" role="progressbar" style={{width: `${value}%`}} aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    )
}

