import React from 'react';

const Container = (props) => {

    // props.className to overload with additional classes
    
    let classNames = 'grid grid-cols-2 md:container md:mx-auto bg-secondary rounded ' + props.className;
    return (
        <div className={classNames}>
            {props.children}
        </div>
    );
}

export default Container;
