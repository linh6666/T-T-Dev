'use client';
import { useState } from 'react';
import {
  IconGauge,
  IconNotes,
  IconUser,
} from '@tabler/icons-react';
import { ScrollArea } from '@mantine/core';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import classes from './NavbarSimple.module.css';
import Project from './Project'; 
import JionProject from './JionProject'; 
// import System from './System'; 
// import Users from './Users'; 
// import ListProject from './ListProject'; 
// import UserProjectRole from './UserProjectRole';
// import HomeAdmin from '../HomeAdmin/index';  
// import ProjectManagere from './ProjectManagere'; 

const mockdata = [
  { label: 'Báo cáo tổng quan', icon: IconGauge, link: 'home' },
 {
    label: 'Quản lý dự án',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Danh sách dự án', link: 'project' },
      { label: 'Dự án MILLENNIA', link: 'project-1' },
      { label: 'Dự án khu Dân Cư Phước Thọ', link: 'project-list' },
    ],
  },
  {
    label: 'Phân quyền người dùng trong dự án',
    icon: IconUser,
    initiallyOpened: true,
    links: [{ label: 'Quản lý người dùng vào dự án', link: 'JionProject' },
     
    ],
  },
];



export function ProjectManagement() {
  const [active, setActive] = useState<string>(''); // <-- thêm state để xử lý active

  const combinedData = [...mockdata, ];

  // Hàm render nội dung tương ứng với menu
  const renderContent = () => {
    switch (active) {
      case 'project':
        return <Project/>;
      case 'user-role-project':
        return <div>Đây là trang dự án</div>;
      case 'permission':
        return <div>Đây là trang dự án</div>;
      case 'project-list':
        return <div>Đây là trang dự án</div>;
      case 'JionProject':
       return <JionProject/>;
      // case 'user-list':
      //   return <UserProjectRole/>;
         
      default:
         return<div>Đây là trang dự án</div>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        margin: '0px auto 10px auto',
        border:
          '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
      }}
    >
      {/* Sidebar */}
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <h1>QUẢN TRỊ DỰ ÁN</h1>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {combinedData.slice(0, mockdata.length).map((item) => (
              <LinksGroup
                {...item}
                key={item.label}
                active={active}
                onActiveChange={setActive} // truyền hàm để đổi nội dung khi click
              />
            ))}
          </div>

       
        </ScrollArea>
      </nav>

      {/* Phần nội dung hiển thị bên phải */}
      <div
        style={{ 
          flex: 1, 
          padding: 20, 
          overflowY: 'auto', 
          height: '800px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className={classes.hidescrollbar}
      >
        {renderContent()}
      </div>
    </div>
  );
}
