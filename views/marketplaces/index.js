import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// material-ui
import { Grid, Stack, Button, TextField } from '@mui/material'
// import InputAdornment from '@mui/material/InputAdornment'
import { useTheme, styled } from '@mui/material/styles'
// import AccountCircle from '@mui/icons-material/AccountCircle'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import ItemCard from 'ui-component/cards/ItemCard'
import { gridSpacing } from 'store/constant'
// import WorkflowEmptySVG from 'assets/images/workflow_empty.svg'
import Data from './data.js'
import ItemCard2 from 'ui-component/cards/ItemCard2'

// API
import marketplacesApi from 'api/marketplaces'

// Hooks
import useApi from 'hooks/useApi'

// const
import { baseURL } from 'store/constant'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#ffab91'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7'
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffab91'
        }
    }
})

// ==============================|| Marketplace ||============================== //

const Marketplace = () => {
    const navigate = useNavigate()

    const theme = useTheme()
    const customization = useSelector((state) => state.customization)

    const [isLoading, setLoading] = useState(true)
    const [images, setImages] = useState({})
    const [buttonSelector, setButtonSelector] = useState('All Categories')
    const [cardData, setCardData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const getAllMarketplacesApi = useApi(marketplacesApi.getAllMarketplaces)

    const goToCanvas = (selectedChatflow) => {
        navigate(`/marketplace/${selectedChatflow.id}`, { state: selectedChatflow })
    }

    useEffect(() => {
        getAllMarketplacesApi.request()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoading(getAllMarketplacesApi.loading)
    }, [getAllMarketplacesApi.loading])

    useEffect(() => {
        if (getAllMarketplacesApi.data) {
            try {
                const chatflows = getAllMarketplacesApi.data
                const images = {}
                for (let i = 0; i < chatflows.length; i += 1) {
                    const flowDataStr = chatflows[i].flowData
                    const flowData = JSON.parse(flowDataStr)
                    const nodes = flowData.nodes || []
                    images[chatflows[i].id] = []
                    for (let j = 0; j < nodes.length; j += 1) {
                        const imageSrc = `${baseURL}/api/v1/node-icon/${nodes[j].data.name}`
                        if (!images[chatflows[i].id].includes(imageSrc)) {
                            images[chatflows[i].id].push(imageSrc)
                        }
                    }
                }
                setImages(images)
            } catch (e) {
                console.error(e)
            }
        }
    }, [getAllMarketplacesApi.data])

    useEffect(() => {
        setCardData(Data)
    }, [])

    const updateCardData = (value) => {
        setSearchTerm('')
        setButtonSelector(value)
        if (value == 'All Categories') {
            setCardData(Data)
        } else {
            let temp = []
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].category == value) {
                    temp.push(Data[i])
                }
            }
            setCardData(temp)
        }
    }
    const searchFunction = (searchTerm) => {
        // Create a regular expression with the search term
        const regex = new RegExp(searchTerm, 'i')

        // Filter the dataArray based on the name using the regex
        const filteredResults = Data.filter((item) => regex.test(item.name))

        // Update the results state with the filtered results
        setCardData(filteredResults)
        setButtonSelector('none')
    }

    return (
        <MainCard sx={{ background: customization.isDarkMode ? theme.palette.common.black : '' }}>
            <Stack flexDirection='row'>
                <h1>Marketplace</h1>
            </Stack>
            <Stack spacing={2} direction='row' justifyContent='space-between' alignItems='center' style={{ marginBottom: '10px' }}>
                <Stack spacing={2} direction='row'>
                    <Button
                        variant='outlined'
                        style={
                            buttonSelector == 'All Categories'
                                ? {
                                      backgroundColor: theme.palette.secondary.dark,
                                      color: theme.palette.secondary.light,
                                      border: '1px solid' + theme.palette.secondary.dark
                                  }
                                : {
                                      color: theme.palette.secondary.dark,
                                      backgroundColor: theme.palette.secondary.light,
                                      border: '1px solid' + theme.palette.secondary.dark
                                  }
                        }
                        size='small'
                        onClick={() => {
                            updateCardData('All Categories')
                        }}
                    >
                        All Categories
                    </Button>
                    <Button
                        variant='outlined'
                        style={
                            buttonSelector == 'TEXT'
                                ? {
                                      backgroundColor: theme.palette.secondary.dark,
                                      color: theme.palette.secondary.light,
                                      border: '1px solid' + theme.palette.secondary.dark
                                  }
                                : {
                                      color: theme.palette.secondary.dark,
                                      backgroundColor: theme.palette.secondary.light,
                                      border: '1px solid' + theme.palette.secondary.dark
                                  }
                        }
                        size='small'
                        onClick={() => {
                            updateCardData('TEXT')
                        }}
                    >
                        Text
                    </Button>
                    <Button
                        variant='outlined'
                        style={
                            buttonSelector == 'DATA'
                                ? {
                                      backgroundColor: theme.palette.secondary.dark,
                                      color: theme.palette.secondary.light,
                                      border: '1px solid' + theme.palette.secondary.dark
                                  }
                                : {
                                      color: theme.palette.secondary.dark,
                                      backgroundColor: theme.palette.secondary.light,
                                      border: '1px solid' + theme.palette.secondary.dark
                                  }
                        }
                        size='small'
                        onClick={() => {
                            updateCardData('DATA')
                        }}
                    >
                        Data
                    </Button>
                    <Button
                        variant='outlined'
                        style={
                            buttonSelector == 'CUSTOM'
                                ? {
                                      backgroundColor: theme.palette.secondary.dark,
                                      color: theme.palette.secondary.light,
                                      border: '1px solid' + theme.palette.secondary.dark
                                  }
                                : {
                                      color: theme.palette.secondary.dark,
                                      backgroundColor: theme.palette.secondary.light,
                                      border: '1px solid' + theme.palette.secondary.dark
                                  }
                        }
                        size='small'
                        onClick={() => {
                            updateCardData('CUSTOM')
                        }}
                    >
                        Custom
                    </Button>
                </Stack>
                <CssTextField
                    size='small'
                    id='outlined-basic'
                    label='search'
                    variant='outlined'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        searchFunction(e.target.value)
                    }}
                />
            </Stack>
            <Grid container spacing={gridSpacing} style={{ padding: '15px 0 30px 0' }}>
                {cardData &&
                    cardData.map((data, index) => {
                        return (
                            <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                                <ItemCard2
                                    name={data.name}
                                    description={data.description}
                                    category={data.category}
                                    subCategory={data.subCategory}
                                    image={data.image}
                                    onClick={() => goToCanvas(cardData)}
                                />
                            </Grid>
                        )
                    })}
            </Grid>
            <Grid container spacing={gridSpacing}>
                {!isLoading &&
                    getAllMarketplacesApi.data &&
                    getAllMarketplacesApi.data.map((data, index) => (
                        <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                            <ItemCard
                                onClick={() => {
                                    goToCanvas(data)
                                    // console.log(data)
                                }}
                                data={data}
                                images={images[data.id]}
                            />
                        </Grid>
                    ))}
            </Grid>
            {/* {!isLoading && (!getAllMarketplacesApi.data || getAllMarketplacesApi.data.length === 0) && (
                <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
                    <Box sx={{ p: 2, height: 'auto' }}>
                        <img style={{ objectFit: 'cover', height: '30vh', width: 'auto' }} src={WorkflowEmptySVG} alt='WorkflowEmptySVG' />
                    </Box>
                    <div>No Marketplace Yet</div>
                </Stack>
            )} */}
        </MainCard>
    )
}

export default Marketplace
