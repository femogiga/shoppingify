import { useSelector, useDispatch } from 'react-redux';

const ProductCard = ({
  productName,
  quantities,
  onIncrement,
  onDecrement,
  visible,
  onVisible
}) => {
  const dispatch = useDispatch();
  return (
    <li className='flex place-items space-between gap-2 flow-1'>
      <span>{productName}</span>

      <div className=' cart-cont flex place-items cg-05'>
        {visible && (
          <>
          <button className='border-none bg-white'>
            <span className='material-symbols-outlined bin'>delete</span>
          </button>

        <button
          className='border-none bg-white'
          onClick={() => dispatch(onDecrement())}>
          <span className='material-symbols-outlined text-orange'>remove</span>
        </button>
           </> )}
        <button className='product-button' onClick={onVisible} >{quantities}</button>
        {visible && <button
          className='border-none bg-white'
          onClick={() => dispatch(onIncrement())}>
          <span className='material-symbols-outlined text-orange'>add</span>
        </button>
        }
      </div>
    </li>
  );
};

export default ProductCard;
