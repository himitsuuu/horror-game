import React from 'react';
import Plain from '../plain/Plain';

export default ({ pos, playerPos, size, angle, isVisible, background, getTransformRule }) =>
    <Plain
        className="painting"
        pos={[pos[0], -pos[1], pos[2]]}
        absPos={[pos[0], -pos[1], pos[2]]}
        playerPos={playerPos}
        size={size}
        isVisible={isVisible}
        angle={angle}
        getTransformRule={getTransformRule}
        background={background}
    />
