import React, {useState} from 'react'
import Spinner from '../../components/withSpinner/with-spinner-component';

function UseSpinner() {
    const [loading, setLoadingState] = useState(false);
    return [
       loading ? <Spinner /> : null,
       () => setLoadingState(true), //mostrar spinner
       () => setLoadingState(false), //esconder spinner

    ];
}

export default UseSpinner

