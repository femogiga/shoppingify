// import React, { useState } from 'react';
// import Card from '../../components/Card';
// import Header from '../../components/Header';
// import ColumnContainer from './../../components/ColumnContainer';
// import Sidebar from '../../components/Sidebar';
// import DarkMode from '../../components/DarkMode';
// import { DndContext } from '@dnd-kit/core';
// import { Link, useParams } from 'react-router';
// import { useDarkMode } from '../../context/DarkModeContext';
// import { useFetchProjects } from '../../apis/projectData';
// import Content from '../../components/Content';


// const Home = () => {
//   const [parent, setParent] = useState(null);
//   const{mode}= useDarkMode()

//   const [tasks, setTasks] = useState({
//     todo: [1, 2, 3],
//     doing: [4, 5, 6, 7, 8],
//     done: [9, 10, 11, 12, 13, 14, 15],
//   });
//   const { data: projectData } = useFetchProjects()
//   const{params} = useParams()
// console.log(params.id)
//   //  const handleDragEnd = (event) => {
//   //    const { active, over } = event;

//   //    if (!over) return;

//   //    const taskId = active.id;
//   //    const newColumn = over.id;

//   //    // Find current column of the task
//   //    let currentColumn = null;
//   //    Object.keys(tasks).forEach((column) => {
//   //      if (tasks[column].includes(taskId)) {
//   //        currentColumn = column;
//   //      }
//   //    });

//   //    if (currentColumn && currentColumn !== newColumn) {
//   //      // Move task to new column
//   //      setTasks((prev) => ({
//   //        ...prev,
//   //        [currentColumn]: prev[currentColumn].filter((id) => id !== taskId),
//   //        [newColumn]: [...prev[newColumn], taskId],
//   //      }));
//   //    }
//   // };

// console.log('----->',projectData)

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const taskId = parseInt(active.id);
//     const overId = over.id;

//     // Find where the task currently is
//     let currentColumn = null;
//     Object.keys(tasks).forEach((col) => {
//       if (tasks[col].includes(taskId)) {
//         currentColumn = col;
//         console.log(over);
//       }
//       return;
//     });

//     // Case 1: Dropped directly on a column (append to end)
//     if (['todo', 'doing', 'done'].includes(overId)) {
//       if (currentColumn && currentColumn !== overId) {
//         setTasks((prev) => ({
//           ...prev,
//           [currentColumn]: prev[currentColumn].filter((id) => id !== taskId),
//           [overId]: [...prev[overId], taskId],
//         }));
//       }
//       return;
//     }

//     // Case 2: Dropped between cards (format: "column-index")
//     if (overId.includes('-')) {
//       const [column, index] = overId.split('-');
//       const targetIndex = parseInt(index);

//       setTasks((prev) => {
//         // Remove from current column
//         const source = prev[currentColumn].filter((id) => id !== taskId);

//         // If same column, remove before inserting
//         const destination =
//           column === currentColumn ? source : [...prev[column]];

//         // Insert at position
//         destination.splice(targetIndex, 0, taskId);

//         return {
//           ...prev,
//           [currentColumn]: source,
//           [column]: destination,
//         };
//       });
//     }
//   };

//   return (
//     <div className=''>
//       {/* <Sidebar /> */}
//       <main className=''>
//         {/* <Header /> */}
//         <Content/>
//         <section
//           className={`${mode === 'light' ? 'bg-light' : 'bg-darker'} content`}>
//           <DndContext onDragEnd={handleDragEnd}>
//             <ColumnContainer key={1} id={'todo'} heading='TODO'>
//               {/* <div className='flex item-center gap-x-05'>
//                 <div className='circle'></div>
//                 <h3 className='font-white padding-block-1 color-dark-white'>
//                   TODO <span>({4})</span>
//                 </h3>
//               </div> */}

//               <div className='grid gap-y-1'>
//                 {tasks.todo.map((id) => (
//                   <Card key={id} id={id} title={`Task ${id}`} />
//                 ))}
//                 {/* <Card key={1} id={1} title={'Make things work'} />
//                 <Card key={2} id={2} />
//                 <Card key={3} id={3} /> */}
//               </div>
//             </ColumnContainer>

//             <ColumnContainer key={2} id={'doing'} heading={'DOING'}>
//               {/* <div className='flex item-center gap-x-05'>
//                 <div className='circle'></div>
//                 <h3 className='font-white padding-block-1 color-dark-white'>
//                   DOING <span>({4})</span>
//                 </h3>
//               </div> */}

//               <div className='grid gap-y-1'>
//                 {tasks.doing.map((id) => (
//                   <Card key={id} id={id} title={`Task ${id}`} />
//                 ))}
//                 {/* <Card key={4} id={4} />
//                 <Card key={5} id={5} />
//                 <Card key={6} id={6} />
//                 <Card key={7} id={7} />
//                 <Card key={8} id={8} /> */}
//               </div>
//             </ColumnContainer>

//             <ColumnContainer key={3} id={'done'} heading='done'>

//               <div className='grid gap-y-1'>
//                 {tasks.done.map((id) => (
//                   <Card key={id} id={id} title={`Task ${id}`} />
//                 ))}
//                 {/* <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card /> */}
//               </div>
//             </ColumnContainer>
//           </DndContext>
//           <div>
//             <div className='flex item-center gap-x-05'>
//               <div className='circle' style={{ visibility: 'hidden' }}></div>
//               <h3 className='font-white padding-block-1 color-dark-white'>
//                 <span style={{ visibility: 'hidden' }}>({4})</span>
//               </h3>
//             </div>
//             <Link
//               to=''
//               style={{
//                 display: 'grid',
//                 placeItems: 'center',
//                 height: '80vh',
//                 backgroundColor: mode === 'light' ? 'lightgray' : '#33415c',
//                 color: mode === 'light' ? 'black' : 'white',
//                 textDecoration: 'none',
//                 borderRadius: '1rem',
//               }}>
//               <span>+New Column</span>
//             </Link>
//           </div>
//         </section>
//         <Content/>
//       </main>
//     </div>
//   );
// };

// export default Home;
