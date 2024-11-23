import { useLocation } from 'react-router-dom';
import classes from '../styles/credits-page.module.css';
import { useState } from 'react';
import { ICast, ICrew } from '../models/mediaModel';
import Tabs, { TabObjectProps } from '../components/Tabs';
import { CREDITS_TABS } from '../data/data';
import CreditItem from '../components/CreditItem';

const CreditsPage = () => {
  const location = useLocation();
  const { credits } = location.state;
  let filteredCrewList: ICrew[] = [];
  const tabs: TabObjectProps[] = CREDITS_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: TabObjectProps) => {
    setSelectedTab(tab);
  };

  let departmentsList: string[] = [];

  departmentsList = credits.crew.map((crew: ICrew) => crew.department);
  departmentsList = [...new Set(departmentsList)];
  filteredCrewList = [...credits.crew];

  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    departmentsList[0]
  );

  const handleSelectDepartment = (department: string) => {
    setSelectedDepartment(department);
  };

  return (
    <div>
      <Tabs
        onSelectType={handleSelectTab}
        selectedType={selectedTab}
        tabs={tabs}
        layoutId='credits_page'
      />
      {selectedTab.value === 'cast' && (
        <div className={classes['list__container']}>
          {credits.cast.map((cast: ICast) => (
            <CreditItem
              key={cast.cast_id || cast.roles[0].credit_id}
              id={cast.id}
              profile_path={cast.profile_path}
              title={cast.name}
              text={
                cast.character ||
                (cast.roles &&
                  cast.roles.map((role) => role.character).join(', '))
              }
            />
          ))}
        </div>
      )}

      {selectedTab.value === 'crew' && (
        <>
          <div className={classes['departments-container']}>
            {departmentsList &&
              departmentsList.map((department) => (
                <button
                  onClick={() => handleSelectDepartment(department)}
                  key={department}
                  className={`btn btn-department ${
                    selectedDepartment === department ? 'selected' : ''
                  }`}
                >
                  {department}
                </button>
              ))}
          </div>
          <div className={classes['list__container']}>
            {filteredCrewList
              .filter((item) => item.department === selectedDepartment)
              .map((crew) => (
                <CreditItem
                  key={crew.credit_id || crew.jobs[0].credit_id}
                  id={crew.id}
                  profile_path={crew.profile_path}
                  title={crew.name}
                  text={
                    crew.job ||
                    (crew.jobs &&
                      `${crew.jobs
                        .map(
                          (job) => `${job.job} (${job.episode_count} episodes)`
                        )
                        .join(', ')}`)
                  }
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CreditsPage;
