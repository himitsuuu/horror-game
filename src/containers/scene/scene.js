import styles from './scene.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Painting from '../../components/painting/painting';
import Floor from '../../components/floor/floor';
import Wall from '../../components/wall/wall';
import Box from '../../components/box/box';
import Switcher from '../../components/switcher/switcher';
import Door from '../../components/door/door';
import { getTransformRule } from '../../lib/utils';
import {
    DOOR_OPEN,
    DOOR_OPENING,
    DOOR_CLOSE,
    PLAYER_RUN,
    PLAYER_WALK,
    PAINTING_TYPE,
    FLOOR_TYPE,
    WALL_TYPE,
    BOX_TYPE,
    SWITCHER_TYPE,
    DOOR_TYPE
} from '../../constants/constants';

class Scene extends React.Component {
    render() {
        const { pos, viewAngle, playerState, doors, objects } = this.props;
        const transformRule = getTransformRule({
            pos: [-pos[0], pos[1], -pos[2]]
        });
        const renderedObjects = [];
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            switch(object.type) {
                case PAINTING_TYPE:
                    renderedObjects.push(<Painting
                        key={object.name}
                        pos={object.pos}
                        playerPos={pos}
                        angle={object.angle}
                        size={object.size.filter(value => value !== 0).slice(0, 2)}
                        isVisible={object.isVisible}
                        background={object.background}
                        getTransformRule={getTransformRule}
                    />);
                    break;
                case FLOOR_TYPE:
                    renderedObjects.push(<Floor
                        key={object.name}
                        pos={object.pos}
                        playerPos={pos}
                        isVisible={object.isVisible}
                        size={object.size}
                        getTransformRule={getTransformRule}
                    />);
                    break;
                case WALL_TYPE:
                    renderedObjects.push(<Wall
                        key={object.name}
                        pos={object.pos}
                        playerPos={pos}
                        isVisible={object.isVisible}
                        size={object.size}
                        getTransformRule={getTransformRule}
                    />);
                    break;
                case BOX_TYPE:
                    renderedObjects.push(<Box
                        key={object.name}
                        pos={object.pos}
                        playerPos={pos}
                        isVisible={object.isVisible}
                        size={object.size}
                        mode={object.props.mode}
                        getTransformRule={getTransformRule}
                    />);
                    break;
                case SWITCHER_TYPE:
                    renderedObjects.push(<Switcher
                        key={object.name}
                        pos={object.pos}
                        size={object.size}
                        angle={object.angle}
                        playerPos={pos}
                        isVisible={object.isVisible}
                        isReachable={object.isReachable}
                        isInteractive={[DOOR_OPEN, DOOR_CLOSE].includes(doors[object.props.id])}
                        isOn={[DOOR_OPEN, DOOR_OPENING].includes(doors[object.props.id])}
                        getTransformRule={getTransformRule}
                    />);
                    break;
                case DOOR_TYPE:
                    renderedObjects.push(<Door
                        key={object.name}
                        pos={object.pos}
                        playerPos={pos}
                        viewAngle={viewAngle}
                        isVisible={object.isVisible}
                        size={object.size}
                        state={doors[object.props.id]}
                        getTransformRule={getTransformRule}
                    />);
                    break;
            }
        }
        const className = [
            'obj',
            playerState === PLAYER_WALK ? styles.playerAnimationWalking :
                playerState === PLAYER_RUN ? styles.playerAnimationRunning : ''
        ].join(' ');
        return <div className={className}>
            <div className="obj" style={transformRule}>
                {renderedObjects}
            </div>
        </div>;
    }
}
Scene.propTypes = {
    pos: PropTypes.arrayOf(PropTypes.number).isRequired,
    viewAngle: PropTypes.arrayOf(PropTypes.number).isRequired,
    playerState: PropTypes.string.isRequired,
    doors: PropTypes.object.isRequired,
    objects: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
    return {
        pos: state.pos,
        viewAngle: state.viewAngle,
        playerState: state.playerState,
        objects: state.objects,
        doors: state.doors
    }
}

export default connect(mapStateToProps)(Scene);