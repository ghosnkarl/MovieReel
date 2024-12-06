import { useState } from 'react';
import { ICrew } from '../../../models/castCrewModel';
import TagsList from '../tags_list/TagsList';
import CreditsList from '../credits_list/CreditsList';

const CrewList = ({ crew }: { crew: ICrew[] }) => {
  let filteredCrewList: ICrew[] = [];

  let departmentsList = crew.map((crew: ICrew) => crew.department);
  departmentsList = [...new Set(departmentsList)];
  filteredCrewList = [...crew];

  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    departmentsList[0]
  );

  const handleSelectDepartment = (department: string) => {
    setSelectedDepartment(department);
  };

  return (
    <div>
      <TagsList
        tagsList={departmentsList}
        selectedTag={selectedDepartment}
        handleSelectTag={handleSelectDepartment}
        list={filteredCrewList}
      />

      <CreditsList
        credits={filteredCrewList.filter(
          (item) => item.department === selectedDepartment
        )}
      />
    </div>
  );
};

export default CrewList;
