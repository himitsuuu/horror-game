require('components/obj/obj.css');
require('./wall.css');

import React from 'react';
import Plain from '../plain/Plain';

// no support for rotated walls for now
export default ({ pos, size, isVisible = true, playerPos, getTransformRule }) => {
    const styleRules = Object.assign(getTransformRule({ pos }), {
        display: isVisible ? 'block' : 'none'
    });

    // Front-Back-Left-Right
    return <div className="wall obj" style={styleRules}>
        <Plain
            pos={[0, -size[1] / 2, size[2] / 2]}
            absPos={[pos[0], pos[1] - size[1] / 2, pos[2] + size[2] / 2]}
            playerPos={playerPos}
            size={size}
            angle={[0, 0, 0]}
            getTransformRule={getTransformRule}
        />
        <Plain
            pos={[0, -size[1] / 2, -size[2] / 2]}
            absPos={[pos[0], pos[1] - size[1] / 2, pos[2] - size[2] / 2]}
            playerPos={playerPos}
            size={size}
            angle={[0, 180, 0]}
            getTransformRule={getTransformRule}
        />
        <Plain
            pos={[-size[0] / 2, -size[1] / 2, 0]}
            absPos={[pos[0] - size[0] / 2, pos[1] - size[1] / 2, pos[2]]}
            playerPos={playerPos}
            size={[size[2], size[1]]}
            angle={[0, -90, 0]}
            getTransformRule={getTransformRule}
        />
        <Plain
            pos={[size[0] / 2, -size[1] / 2, 0]}
            absPos={[pos[0] + size[0] / 2, pos[1] - size[1] / 2, pos[2]]}
            playerPos={playerPos}
            size={[size[2], size[1]]}
            angle={[0, 90, 0]}
            getTransformRule={getTransformRule}
        />
    </div>;
}