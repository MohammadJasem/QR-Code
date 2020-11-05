import React from 'react';

function Toggle({onClick}){
    return(
        <div className="m-2 d-md-block d-none">
            <button className="btn btn-light"
                onClick={onClick}
            >
                <span className="fa fa-bars fa-lg"></span>&nbsp;&nbsp;
                Toggle
            </button>
         </div>
    );
}

export default Toggle;
