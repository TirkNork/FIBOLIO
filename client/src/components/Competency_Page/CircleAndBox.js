import Circle from './circle';
import Box from './Box';

function CircleAndBox(props) {
    return (<Box title={props.title} detail={props.detail} color={props.color}>
        <Circle points={props.points} color={props.color}></Circle>
    </Box>)
}

export default CircleAndBox;