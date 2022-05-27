import Account from 'arweave-account';
import { T_profile } from 'arweave-account/lib/types';
import { useEffect, useState } from 'react';

function Profile({walletAddr}: {walletAddr: string}) {
  const [userProfile, setUserProfile] = useState<T_profile | null>(null);

  useEffect(() => {
    (async () => {
      const account = new Account();
      const a = await account.get(walletAddr);
      if(a?.profile) setUserProfile(a.profile);
    })();
  }, [walletAddr]);
  
  return(
    <>
      <div>
        {userProfile?.avatar
          ? <img src={`https://arweave.net/${userProfile.avatar}`} width={200} alt="avatar" />
          : <img src={`https://brhqy4254yjhasbiflsgacrvnz6xicjhybcst7nle4vxlrjjpe.arweave.net/DE8Mc13mEnBIKCrkY-Ao1bn10CSfARSn9qycrdcUpeU`} width={200} alt="default avatar" />
        }
      </div>
      <div>
        {userProfile?.handle
          ? userProfile.handle
          : walletAddr
        }
      </div>
      <hr />
      <pre style={{textAlign: 'left'}}>
        {JSON.stringify(userProfile, null, 4)}
      </pre>
    </>
  );
}

export default Profile;