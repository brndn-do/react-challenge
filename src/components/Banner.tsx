import type { User } from 'firebase/auth';

interface BannerProps {
  title: string;
  onCoursePlanClick: () => void;
  user?: User | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const Banner = ({ title, onCoursePlanClick, user, onSignIn, onSignOut }: BannerProps) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h1>{title}</h1>
      <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
        <button onClick={onCoursePlanClick}>Course Plan</button>
        {user ? (
          <>
            <span>{user.displayName ?? user.email}</span>
            <button onClick={onSignOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={onSignIn}>Sign in with Google</button>
        )}
      </div>
    </div>
  )
};

export default Banner;