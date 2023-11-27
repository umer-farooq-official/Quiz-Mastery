"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturesPane.module.css";
import { useContext } from "react";
import SidebarContext from "./SidebarContext";
import { useTheme } from 'next-themes'
import {
  BiChevronRight, BiHomeAlt, BiBookOpen, BiFile,
  BiCube, BiUserCircle, BiCog, BiMessageDetail,
  BiLogOut, BiSun, BiMoon, BiTrophy, BiPieChartAlt
} from "react-icons/bi";


export default function FeaturesPane() {
  const iconSize = "20px";

  const { theme, setTheme } = useTheme()
  const { sidebar, setSidebar } = useContext(SidebarContext);

  const expandSidebar = () => {
    setSidebar(sidebar === "close" ? "open" : "close");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  };

  return (
    <>
      <nav
        className={`${styles.sidebar} ${sidebar == "close" ? styles.close : ""
          } ${styles.root} ${theme == "dark" ? styles.dark : styles.light}`}
      >
        <header className={styles.header}>
          <div className={styles.imageText}>
            <span className={styles.image}>
              <Image src="/logo.png" alt="logo" width={40} height={40} />
            </span>

            <div className={`${styles.text} ${styles.logoText}`}>
              <span className={styles.name}>Quiz Mastery</span>
            </div>
          </div>

          <i className={`${styles.toggle}`}>
            <BiChevronRight onClick={expandSidebar} />
          </i>
        </header>

        <div className={styles.menuBar}>
          <div className={styles.menu}>
            <ul className={styles.menuLinks}>
              <li className={styles.navLink}>
                <Link href="/dashboard" className={styles.a}>
                  <i className={`${styles.icon}`}>
                    <BiHomeAlt size={iconSize} />
                  </i>
                  <span className={`${styles.text} ${styles.navText}`}>
                    Dashboard
                  </span>
                </Link>
              </li>

            

            

              <li className={styles.navLink}>
                <Link href="/createTest" className={styles.a}>
                  <i className={`${styles.icon}`}>
                    <BiPieChartAlt size={iconSize} />
                  </i>
                  <span className={`${styles.text} ${styles.navText}`}>
                    Create Test
                  </span>
                </Link>
              </li>

              

              

              <li className={styles.navLink}>
                <Link href="/settings" className={styles.a}>
                  <i className={`${styles.icon}`}>
                    <BiCog size={iconSize} />
                  </i>
                  <span className={`${styles.text} ${styles.navText}`}>
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.bottomContent}>
            <li className="">
              <Link href="/logout" className={styles.a}>
                <i className={`${styles.icon}`}>
                  <BiLogOut size={iconSize} />
                </i>
                <span className={`${styles.text} ${styles.navText}`}>
                  Logout
                </span>
              </Link>
            </li>

            <li onClick={toggleTheme} title="Switch Theme">
              <Link href="#" className={styles.a}>
                <i className={styles.icon}>
                  {theme == "dark" ? (
                    <BiSun size={iconSize} />
                  ) : (
                    <BiMoon size={iconSize} />
                  )}
                </i>
                <span className={`${styles.text} ${styles.navText}`}>
                  {theme == "dark" ? "Light" : "Dark"} Mode
                </span>
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}
