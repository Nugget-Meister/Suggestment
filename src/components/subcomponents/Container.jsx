import React from 'react';

const Container = (props) => {
    let classNames = 'grid grid-cols-2 md:container md:mx-auto bg-secondary rounded';
    return (
        <div className={classNames}>
            {props.children}
        </div>
    );
}

export default Container;
