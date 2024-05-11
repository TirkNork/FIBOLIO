import Cirlce from './circle';
import Box from './Box';

function CircleAndBox(props){
    return (<Box title={props.title} detail={props.detail} color={props.color}>
    <Cirlce  points={props.points} color={props.color}></Cirlce>
    </Box>)
}

export default CircleAndBox;