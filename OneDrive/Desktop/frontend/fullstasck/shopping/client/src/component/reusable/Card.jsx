const Card = ({product}) => {
  return (
    <button className='card'>
      <p>{product }</p>
      <span className='material-symbols-outlined'>add</span>
    </button>
  );
};

export default Card;
