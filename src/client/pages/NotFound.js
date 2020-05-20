import React from 'react';

const NotFound = ( {staticContext={}}) => {
    console.log(staticContext)
    staticContext.NotFound=true
    return (
        <div>
           Not Found!...
        </div>
    );
};

export default {
    component:NotFound
}