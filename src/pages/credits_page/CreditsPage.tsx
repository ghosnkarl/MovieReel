import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ICrew } from '../../models/castCrewModel';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import { CREDITS_TABS } from '../../data/tabsData';
import TagsList from '../../components/lists/tags_list/TagsList';
import CreditsList from '../../components/lists/credits_list/CreditsList';

const CreditsPage = () => {
  const location = useLocation();
  const { credits } = location.state;
  let filteredCrewList: ICrew[] = [];
  const tabs: ITabObject[] = CREDITS_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: ITabObject) => {
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
        <CreditsList credits={credits.cast}></CreditsList>
      )}

      {selectedTab.value === 'crew' && (
        <>
          <TagsList
            tagsList={departmentsList}
            selectedTag={selectedDepartment}
            handleSelectTag={handleSelectDepartment}
          />

          <CreditsList
            credits={filteredCrewList.filter(
              (item) => item.department === selectedDepartment
            )}
          />
        </>
      )}
    </div>
  );
};

export default CreditsPage;
