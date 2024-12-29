import { useState } from 'react';
import { ICrew } from '@/models/castCrewModel';
import TagsList from '@/components/lists/tagsList/TagsList';
import CreditsList from '@/components/lists/creditsList/CreditsList';

const CrewList = ({ crew }: { crew: ICrew[] | undefined }) => {
  let filteredCrewList: ICrew[] = [];

  let departmentsList = crew ? crew.map((crew: ICrew) => crew.department) : [];
  departmentsList = [...new Set(departmentsList)];
  filteredCrewList = crew ? [...crew] : [];

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
