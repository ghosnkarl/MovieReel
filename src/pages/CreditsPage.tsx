import { useLocation } from 'react-router-dom';
import classes from '../styles/credits-page.module.css';
import { useState } from 'react';
import { CastInterface, CrewInterface } from '../models/mediaModel';
import PersonListItem from '../components/PersonListItem';
import Tabs, { TabObjectProps } from '../components/Tabs';
import { CREDITS_TABS } from '../data/data';

const CreditsPage = () => {
  const location = useLocation();
  const { credits } = location.state;
  let filteredCrewList: CrewInterface[] = [];
  const tabs: TabObjectProps[] = CREDITS_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: TabObjectProps) => {
    setSelectedTab(tab);
  };

  let departmentsList: string[] = [];

  departmentsList = credits.crew.map((crew: CrewInterface) => crew.department);
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
        <div className='flex--wrap-container'>
          {credits.cast.map((cast: CastInterface) => (
            <PersonListItem
              key={cast.credit_id}
              id={cast.id}
              profile_path={cast.profile_path}
              title={cast.name}
              text={cast.character}
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
          <div className='flex--wrap-container'>
            {filteredCrewList
              .filter((item) => item.department === selectedDepartment)
              .map((crew) => (
                <PersonListItem
                  key={crew.credit_id}
                  id={crew.id}
                  profile_path={crew.profile_path}
                  title={crew.name}
                  text={crew.job}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CreditsPage;