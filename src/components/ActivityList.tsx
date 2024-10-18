
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Button
  } from '@chakra-ui/react'
import { Activity } from '../types'
import { categories } from '../data/categories'
import { useMemo } from 'react'
import {SquarePen, Trash, Frown} from 'lucide-react'
import { ActivityActions } from '../reducers/activity-reducer'

type ActivityListProps = {
    activities: Activity[]
    dispatch: React.Dispatch<ActivityActions>
    isOpen:boolean
    onClose: () => void
    onOpen: () => void
}

function ActivityList({activities, dispatch,isOpen,onClose,onOpen}: ActivityListProps) {
    const placement = 'left'

    const categoryName= useMemo(()=> 
        (category:Activity['category'])=> categories.map(cat=> cat.id===category ? cat.name : ''),
        [activities])

    const isEmptyActivities= useMemo(()=>activities.length===0,[activities])

  return (
          <>
            <Button colorScheme='blue' onClick={onOpen}>
              Mis Actividades
            </Button>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size={'lg'}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'  className='bg-purple-700'>
                    <div className='flex justify-between'>
                        <p className='font-bold text-2xl text-white'>Mis Actividades</p>
                        <Button onClick={onClose}>
                            close
                        </Button>
                    </div>
                </DrawerHeader>
                <DrawerBody className='bg-purple-500'>
                  { isEmptyActivities ? <span className='w-full flex justify-center mt-6'> <p className='text-2xl'>No hay Actividades aun... </p> <Frown  className='ml-5 w-8 h-8'/> </span>
                  : activities.map(activity=>(
                    <div key={activity.id} className='px-5 py-10 bg-white mt-5 flex justify-between'>
                        <div className='space-y-2 relative'>
                            <p className={`absolute -top-8 -lef-8 px-10 py-2 text-white uppercase font-bold ${activity.category===1 ? 'bg-purple-700': 'bg-fuchsia-700'}`}>
                                {categoryName(+activity.category)}
                            </p>
                            <p className='text-2xl font-bold pt-5'>
                                {activity.name}
                            </p>
                            <p className='font-black text-4xl text-lime-500'>
                                {activity.calories}{' '}
                                <span>Calorias</span>
                            </p>
                        </div>

                        <div className='flex gap-5 items-center'>
                            <button
                              onClick={()=>{
                                dispatch({type:'edit-activity', payload:{id:activity.id}})
                                onClose()
                              }}
                            >
                                <SquarePen
                                    className='h-7 w-7 hover:h-8 hover:w-8 text-gray-800 hover:text-sky-500'
                                />
                            </button>

                            <button
                              onClick={()=>{
                                dispatch({type:'delete-activity', payload:{id:activity.id}})
                                onClose()
                              }}
                            >
                                <Trash
                                    className='h-7 w-7 hover:h-8 hover:w-8 text-gray-800 hover:text-red-600'
                                />
                            </button>
                        </div>
                    </div>
                  ))}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )
      }
export default ActivityList