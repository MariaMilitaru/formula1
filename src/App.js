import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { mockData } from './mockData ';
import {useState} from 'react';
import DriverCard from './DriverCard';


function App() {
  const [data,setData] = useState(mockData);

  //orders the players by points number 
  const orderDrivers = (data) => {
    data.sort((a, b) => b.points - a.points )
  }
  orderDrivers(data);

  //returns an array of teams with objects that contain Team Name and Total Points of the team
  const createTeamArray = (data) => {
      let teams = [];
      data.map((driver1,id1) => {
          let data2 = data.slice(id1 + 1, data.length);
          data2.map((driver2) => {
              if(driver1.team == driver2.team) {
                  const points = driver1.points + driver2.points ;
                  const team = { teamName : driver1.team, teamPoints: points };
                  teams.push(team);
              } 
          })
      });
      return teams;
  }
  //returns the Name of the best team
  const findBestTeam = (teams) => {
    let max = teams[0].teamPoints;
    let bestTeamName = teams[0].teamName;
    teams.map((team) => {
        if (team.teamPoints > max) {
            max = team.teamPoints;
            bestTeamName = team.teamName;
        }
    });
    return bestTeamName;
  }
  const bestTeamName = findBestTeam(createTeamArray(data));

  //returns an array with the images of the players from the best team 
  const findTeamImg = (data,teamName) => {
      let teamImg = [];
      data.map((driver) => {
          if(driver.team == teamName) {
            teamImg.push(driver.image);
          }
      });
      return teamImg
  }
  const bestTeamImg = findTeamImg(data,bestTeamName);


  const handleIncreaseScore = (index) => {
      let newDriver = {...data[index]};
      newDriver.points += 5;
      setData([...data.slice(0,index), newDriver, ...data.slice(index+1,data.length)]);
  }

  const handleDecreaseScore = (index) => {
    let newDriver = {...data[index]};
    newDriver.points -= 5;
    setData([...data.slice(0,index), newDriver, ...data.slice(index+1,data.length)]);
}

  return (
    <div className="d-flex">
        <div className=" container d-flex align-content-around flex-wrap">
            {data.map((driver,idx) => (
                <DriverCard key={driver.number} 
                driver={driver} 
                idx={idx}
                handleIncreaseScore={handleIncreaseScore}
                handleDecreaseScore={handleDecreaseScore}
                />
            ))}
        </div>
        <div>
            <DriverCard 
              bestTeamName={bestTeamName}
              bestTeamImg ={bestTeamImg}
            />
        </div>
    </div>
  );
}

export default App;
