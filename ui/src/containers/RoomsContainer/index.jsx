import React, { useEffect, useState } from "react";

import _service from '@netuno/service-client';

import Spin from 'antd/lib/spin';

export default ({ui})=> {
    const [ rooms, setRooms ] = useState([]);
    const [ roomsLoading, setRoomsLoading ] = useState(false);
    useEffect(()=> {
        setRoomsLoading(true);
        _service({
            url: "rooms",
            success: (response) => {
                if (response.json) {
                    setRoomsLoading(false);
                    if (response.json.length > 0) {
                        setRooms(response.json);
                    }
                }
            },
            fail: (e) => {
                setRoomsLoading(false);
                console.log("Rooms Service Error", e);
            }
        });
    }, []);

    return (
        <div>
          {roomsLoading && <Spin/>}
          { rooms.map((room)=> {
              return (
                  <div>
                    {JSON.stringify(room)}
                  </div>
              );
          })}
        </div>
    );
}
