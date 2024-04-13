import spinner from '../../assets/spinner.gif';

function Spinner() {
  return (
    <>
      <div>
        <img src={spinner} alt='' className='d-block m-auto' width={20} height={20} />
      </div>
    </>
  );
}

export default Spinner;
