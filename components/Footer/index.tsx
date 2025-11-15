"use client";

import { Text, Title, Box } from '@mantine/core';

import styles from './FooterLinks.module.css';
// import AppContainer from "../../common/AppContainer";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerOverlay} >
      
          
     

          {/* Thông tin công ty ở giữa */}
          <Box className={styles.company}>
            <Title order={5}>CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN T&T HOMES</Title>
               <Text>Phone: <strong>(+84) 24 38316969</strong></Text>
            <Text>Tầng 1, Số 2A Phố Phạm Sư Mạnh, Phường Cửa Nam, Thành phố Hà Nội, Việt Nam</Text>
         
           
          </Box>

      

       
      </div>
    </footer>
  );
}