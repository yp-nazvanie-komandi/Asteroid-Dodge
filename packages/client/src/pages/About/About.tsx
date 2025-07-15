import avatarImg from '/src/assets/img/tmp-avatar.png'

export const About = () => {
  const profile = {
    name: 'test name',
    img: avatarImg,
  }
  return (
    <div className={'container container--about'}>
      <div className="main-block"></div>

      <div className="links">
        <a className="links-avatar" href={'/profile'}>
          <img src={profile.img} alt="avatar" />
        </a>
      </div>
    </div>
  )
}
