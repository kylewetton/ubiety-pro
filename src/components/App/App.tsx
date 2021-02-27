import React, {Suspense} from 'react';
import World from '../World';

const App: React.FC = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <World />
        </Suspense>
    )
}

export default App;