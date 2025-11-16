import { useDarkMode } from "../context/DarkModeContext";

const BlankContent = () => {
  const { mode } = useDarkMode();

  return (
    <section
      className={`${mode === 'light' ? 'bg-light' : 'bg-darker'} content`}
      style={{ display: 'flex', gap: '1rem', padding: '1rem' }} // Added flex layout
    >


      <div>
        <div className='flex item-center gap-x-05'>
          <div className='circle' style={{ visibility: 'hidden' }}></div>
          <h3 className='font-white padding-block-1 color-dark-white'>
            <span style={{ visibility: 'hidden' }}>({0})</span>{' '}
            {/* Fixed count */}
          </h3>
        </div>
        <>

        </>
      </div>
    </section>
  );
};

export default BlankContent;
