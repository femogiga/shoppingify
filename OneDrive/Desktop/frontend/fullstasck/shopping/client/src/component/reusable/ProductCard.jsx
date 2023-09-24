const ProductCard = () => {
  return (
    <li className='flex place-items space-between gap-2 flow-1'>
      <span>Avocado</span>
      <div className=' cart-cont flex place-items cg-05'>
        <button className='border-none bg-white'>
          <span className='material-symbols-outlined bin'>delete</span>
        </button>
        <button className='border-none bg-white'>
          <span className='material-symbols-outlined text-orange'>remove</span>
        </button>
        <button className='product-button'>3 pc</button>
        <button className='border-none bg-white'>
          <span className='material-symbols-outlined text-orange'>add</span>
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
