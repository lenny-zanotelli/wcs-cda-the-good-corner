import styles from './../styles/NavCategory.module.css'

export type CategoryProps = {
  id: number;
  name: string;
}

const NavCategory = ({ name }: CategoryProps) => {
  return (
    <>
      <a href="" className={styles.categoryNavigationLink}>{name}</a> •
    </>
  )
}

export default NavCategory;