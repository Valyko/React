import Title from '../../components/Title'
import Button from '../../components/Button'
import BreadCrumbs from '../../components/BreadCrumbs'
import styles from './PageAboutUs.module.scss'
import Container from '../../components/Container'

const PageAboutUs = () => {
  return (
    <Container>
      <BreadCrumbs />
      <Title subtitle='About brand and our philosophy' />
      <div className={styles.block}>
        <div className={styles.block_text}>
          <div>
            <p>
              We are young Ukrainian brand from Kyiv. We designs exclusive
              handmade lingerie, swimsuits and homeweare for women.
            </p>
            <p>
              We use only the best and high-quolity materials for our lingerie.
            </p>
            <p>
              This campaign carries a valuable message of the importance of
              escaping unwanted captivity to achieve the highest good of all.
            </p>
          </div>
          <img src='https://kept.com.ua/image/M6p/dotuk-38.png' alt='brand' />
        </div>
        <div className={styles.block_img}>
          <img
            src='https://kept.com.ua/image/M6q/dotuk-38_(1).png'
            alt='brand'
          />
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.list_title}>
          <p className={styles.title}>The main reasons to choose us:</p>
        </div>
        <div className={styles.list_li}>
          <p>Unique lingerie designs.</p>
          <p>Handmade production and the best quality.</p>
        </div>
      </div>
      <div className={styles.imgs}>
        <img src='https://kept.com.ua/image/20Dl/dotuk-17.jpg' alt='card' />
        <img src='https://kept.com.ua/image/20Dk/dotuk-15.jpg' alt='card' />
        <img src='https://kept.com.ua/image/20Do/dotuk-21.jpg' alt='card' />
        <img src='https://kept.com.ua/image/20Dm/dotuk-18.jpg' alt='card' />
      </div>
      <div className={styles.text}>
        <p>
          The brand was founded in 2014, it reflects its own style, character
          and outlook. Each release of the brand explores several different
          directions, which together open new facets of femininity and freedom.
          Inspired by a global community of talented, creative women who push
          traditional boundaries, we embody a fundamental freedom: freedom from
          conventions and rules. At the same time, combining design and
          craftsmanship, the brand is focused on technology and ensuring
          inclusiveness in all its manifestations.
        </p>
      </div>
      <Button
        to='/catalog/filter'
        text='Go to catalog'
        className={styles.btn}
      />
      <div className={styles.lastimg}>
        <img src='https://kept.com.ua/image/20F6/banner2.jpg' alt='img' />
      </div>
    </Container>
  )
}

export default PageAboutUs
