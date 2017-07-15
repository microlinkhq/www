const dateFormat = require('dateformat')

export default ({title, image, url, publisher, author, date}) =>
  <section className='mw6 mw7-l'>
    <div className=''>
      <a href={url} target='_blank' rel='noopener'>
        <img src={image} className='card__image hover-transition w-100' />
      </a>
    </div>

    <div className='absolute bottom-0 right-0 left-0 pa3 bg-black lh-copy o-80'>
      <span>
        <span className='f7 f5-l silver'>
          {publisher}
        </span>
        <br />
        <a href={url} rel='noopener' className='f2 b link white'>
          {title}
        </a>
      </span>
      <br />
      <span className='f7 f5-l silver'>
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
      }

      .card__image:hover {
        box-shadow: 0 0 60px 0 #fff;
      }
    `}</style>
  </section>
