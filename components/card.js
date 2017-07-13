const dateFormat = require('dateformat')

export default ({title, image, url, publisher, author, date }) => (
  <section
    className='mw6'>
    <div className=''>
      <a href={url} rel='noopener'>
        <img src={image} className='card__image hover-transition w-100' />
      </a>
    </div>

    <div className='absolute bottom-0 right-0 left-0 pa3 bg-black lh-copy'>
      <span>
        <span className='f7 silver'>{publisher}</span>
        <br />
        <a href={url} rel='noopener' className='b link white'>{title}</a>
      </span>
      <br />
      <span className='f7 silver'>{dateFormat(date, 'dddd, mmmm dS yyyy')}</span>
    </div>
    <style jsx>{`
      .card__image {
        box-shadow: 0 50px 50px -50px rgb(255, 255, 255);
      }
    `}</style>
  </section>
)
