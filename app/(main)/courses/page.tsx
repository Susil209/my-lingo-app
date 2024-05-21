import { getCourses, getUserProgress } from '@/db/queries'
import React from 'react'
import { List } from './list';

const CoursesPage = async() => {

    const dataPromise =  getCourses();
    const userProgressPromise = getUserProgress()


    const [ data, userProgress ] = await Promise.all([
        dataPromise, userProgressPromise
    ])

  return (
    <div className="h-full max-w-[912px] px-3 mt-4 mx-auto">
        <h1 className='text-2xl font-bold text-neutral-700'>
        Language Courses
        </h1>
        {/* {JSON.stringify(data)} */}

        <List 
            courses={data}
            activeCourseId={userProgress?.activeCourseId}
        />
    </div>
  )
}

export default CoursesPage