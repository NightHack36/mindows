import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TaskBar from '../../components/TaskBar/TaskBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import { selectAccountSettings, selectTaskBarApps } from '../../redux/account/account.selectors';
import { selectActiveUser } from '../../redux/auth/auth.selectors';
import { loadAccount } from '../../redux/account/account.actions';
import './Desktop.scss';
import Program from '../Program/Program';


const Desktop = ({ activeUser }) => {

  const accountSettings = useSelector(selectAccountSettings);
  const [startMenu, toggleStartMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const style = { backgroundImage: 'url(' + process.env.PUBLIC_URL + '"/images/' + accountSettings.background + '")' };
  const taskbarApps = useSelector(selectTaskBarApps);

  useEffect(() => {
    activeUser
      ? dispatch(loadAccount(activeUser))
      : history.push('/');
  }, []); 

  return (
    <div className='Desktop' style={style}>

      <Program />

      <TaskBar
        apps={taskbarApps}
        onMindowsIconClick={() => toggleStartMenu(!startMenu)} />
      <StartMenu user={activeUser} hide={!startMenu} />
    </div>
  )

};

export default Desktop;