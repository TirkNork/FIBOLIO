import styles from './Box.module.css';

function Box(props) {
  return (
    <div>
        
    <div className={styles.box} style={{borderBlockColor: props.color}}>
      <h3 className={styles.title}>{props.title}</h3>
      <h4 className={styles.title}>{props.detail}</h4>
      {props.children}
    </div>
    </div>
  );
}

export default Box;