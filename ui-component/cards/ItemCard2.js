import * as React from 'react'
import Card from '@mui/material/Card'
import { Stack, CardActionArea } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import Chip from '@mui/material/Chip'
import QuotePng from '../../assets/images/quote.png'

// material-ui
import { useTheme } from '@mui/material/styles'

const ItemCard2 = ({ name, description, category, subCategory, image, onClick }) => {
    const theme = useTheme()
    return (
        <>
            <Card
                variant='outlined'
                // sx={{ boxShadow: 2 }}
                style={{
                    position: 'relative',
                    borderRadius: '2%',
                    padding: '0',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                }}
                onClick={onClick}
            >
                <CardActionArea>
                    <React.Fragment>
                        <CardContent>
                            <Typography variant='h1' sx={{ fontSize: 15, width: '90%' }} color='text.secondary' gutterBottom>
                                {name}
                            </Typography>
                            <img src={QuotePng} alt='icon' style={{ height: '30px', position: 'absolute', top: '10px', right: '10px' }} />
                            <Typography component='div' sx={{ fontSize: 12 }} color='text.dark' style={{ margin: '10px 0' }}>
                                {description}
                            </Typography>
                            <div
                                color='text.secondary'
                                style={{
                                    position: 'absolute',
                                    bottom: '5px',
                                    right: '5px',
                                    fontSize: '10px'
                                }}
                            >
                                <Stack spacing={1} direction='row' justifyContent='space-between' alignItems='center'>
                                    <div
                                        style={{
                                            borderRadius: '8%',
                                            border: '1px solid ' + theme.palette.secondary.dark,
                                            backgroundColor: theme.palette.secondary.light,
                                            display: 'inline-block',
                                            padding: '0 5px',
                                            fontSize: '10px'
                                        }}
                                    >
                                        {category}
                                    </div>
                                    {subCategory ? (
                                        <div
                                            style={{
                                                borderRadius: '8%',
                                                border: '1px solid ' + theme.palette.secondary.dark,
                                                backgroundColor: theme.palette.secondary.light,
                                                display: 'inline-block',
                                                padding: '0 5px',
                                                fontSize: '10px'
                                            }}
                                        >
                                            {subCategory}
                                        </div>
                                    ) : null}
                                </Stack>
                            </div>
                        </CardContent>
                    </React.Fragment>
                </CardActionArea>
            </Card>
        </>
    )
}
ItemCard2.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func
}
export default ItemCard2
