import dateFormat from 'dateformat'

export default ({title, image, url, publisher, author, date}) =>
  <section className=''>
    <div className=''>
      <a target='_blank' rel='noopener'>
        <img
          src={image}
          className='card__image hover-transition'
          style={{objectFit: 'cover'}}
            />
      </a>
    </div>

    <div className='absolute bottom-0 right-0 left-0 pa3 bg-black lh-copy o-80'>
      <span>
        <span className='f7 f5-ns silver'>
          {publisher}
        </span>
        <br />
        <a className='f4 f2-ns b link white' target='_blank' rel='noopener'>
          {title}
        </a>
      </span>
      <br />
      <span className='f7 f5-ns silver'>
        {dateFormat(date, 'dddd, mmmm dS yyyy')}
      </span>
    </div>
    <style jsx>{`
      .card__image {
        box-shadow: 0 0 40px 0 #fff;
        transition-property: box-shadow;
        will-change: box-shadow;
        transition-duration: .2s;
        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        height: 13rem;
        width: 23rem;
      }

      @media screen and (min-width: 48em) {
        .card__image {
          width: 48rem;
          height: 27rem;
        }
      }

      .card__image:hover {
        box-shadow: 0 0 60px 0 #fff;
      }
    `}</style>
  </section>
