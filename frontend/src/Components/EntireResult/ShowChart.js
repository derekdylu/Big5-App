import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import CircularProgress from '@mui/material/CircularProgress';

import { getInterviewsByIndustry, updateInterviewById } from '../../Utils/Axios'

import theme from '../../Themes/Theme';

const fakeBig = [12,33,44,52,35]
const fakeScore = 72
const industry = "🎨 ART"

const industriesList = [
  "🎨 ART",
  "🛠️ ENGINEERING",
  "💻 SOFTWARE",
  "🏗️ CIVIL ENGINEERING",
  "💼 CONSULTANTING",
  "👥 MANAGEMENT",
  "⚽️ SPORTS",
  "🎥 MEDIA",
  "🏭 MANUFACTURING"
]

const ShowChart = () => {

  const [rank, setRank] = useState([0, 0, 0, 0, 0, 0])
  const [filter, setFilter] = useState(industry)
  const [allInterviews, setAllInterviews] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    changeIndustry(industry)
  }, [])

  const changeIndustry = (target) => {
    setLoading(true)
    getInterviewsByIndustry(target).then((res) => {
      // console.log("get interviews by industry", res)
      setAllInterviews(res)
      calculateRank(fakeBig, fakeScore, res)
    }).catch((err) => {
      console.log(err)
    })
  }

  const calculateRank = (big, score, all) => {
    let _order = []
    for (let i = 0; i < big.length; i++) {
      let __order = []
      all.map(x => {
        __order.push(x.big[i])
      })
      __order.push(big[i])
      __order.sort()
      _order.push(__order)
    }
    let __order = []
    all.map(x => {
      __order.push(x.score)
    })
    __order.push(score)
    __order.sort()
    _order.push(__order)

    let _rank = []
    for (let j = 0; j < _order.length - 1; j++) {
      let percentile = Math.floor((1 - _order[j].indexOf(big[j]) / _order[j].length) * 100)
      _rank.push(percentile)
    }
    let percentile = Math.floor((1 - _order[_order.length - 1].indexOf(score) / _order[_order.length - 1].length) * 100)
    _rank.push(percentile)
    setRank(_rank)
    setLoading(false)
    // console.log(_rank)
  }

  const handleChange = (event) => {
    setFilter(event.target.value)
    changeIndustry(event.target.value)
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          px: 2,
          pt: 2
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={1}
          sx={{
            my: 2
          }}
        >
          <NativeSelect
            value={filter}
            onChange={handleChange}
            size="small"
          >
            {industriesList.map(x =>
              <option value={x}>{x}</option>
            )}
          </NativeSelect>
        </Grid>
        <Typography variant="caption" sx={{mt:-1, mb:0.5}}>
          Your PR value among industry groups
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: theme.palette.OCEAN_O.main,
                borderRadius: "16px",
              }}
              sx={{
                px: 2,
                py: 2
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {/* <EmojiEventsRoundedIcon sx={{ color: theme.palette.secondary[900] }}/> */}
                <Typography color="#ffffff" variant="caption" fontWeight="700" sx={{pl: 0.25}}>
                  Openness
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                <Typography color="#ffffff" fontSize="42pt" fontWeight="900" sx={{ letterSpacing: -2 }}>
                  {loading ?
                    <CircularProgress />
                    : rank[0]
                  }
                </Typography>
                <Typography color="#ffffff" variant="h2" fontWeight="700" noWrap sx={{pl: 0.5, pb: 1.25}}>
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: theme.palette.OCEAN_C.main,
                borderRadius: "16px",
              }}
              sx={{
                px: 2, py: 2, mb: 1
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {/* <EmojiEventsRoundedIcon sx={{ color: theme.palette.secondary[900] }}/> */}
                <Typography color="#ffffff" variant="caption" fontWeight="700" sx={{pl: 0.25}}>
                  C16s
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                <Typography color="#ffffff" fontSize="42pt" fontWeight="900" sx={{ letterSpacing: -2 }}>
                  {loading ?
                    <CircularProgress />
                    : rank[1]
                  }
                </Typography>
                <Typography color="#ffffff" variant="h2" fontWeight="700" noWrap sx={{pl: 0.5, pb: 1.25}}>
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={6} id="grid wrapper">
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: theme.palette.OCEAN_E.main,
                borderRadius: "16px",
              }}
              sx={{
                px: 2,
                py: 2
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {/* <EmojiEventsRoundedIcon sx={{ color: theme.palette.secondary[900] }}/> */}
                <Typography color="#ffffff" variant="caption" fontWeight="700" sx={{pl: 0.25}}>
                  Extraversion
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                <Typography color="#ffffff" fontSize="42pt" fontWeight="900" sx={{ letterSpacing: -2 }}>
                  {loading ?
                    <CircularProgress />
                    : rank[2]
                  }
                </Typography>
                <Typography color="#ffffff" variant="body2" fontWeight="700" noWrap sx={{pl: 0.5, pb: 1.25}}>
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: theme.palette.OCEAN_A.main,
                borderRadius: "16px",
              }}
              sx={{
                px: 2, py: 2, mb: 1
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {/* <EmojiEventsRoundedIcon sx={{ color: theme.palette.secondary[900] }}/> */}
                <Typography color="#ffffff" variant="caption" fontWeight="700" sx={{pl: 0.25}}>
                  Agreeableness
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                <Typography color="#ffffff" fontSize="42pt" fontWeight="900" sx={{ letterSpacing: -2 }}>
                  {loading ?
                    <CircularProgress />
                    : rank[3]
                  }
                </Typography>
                <Typography color="#ffffff" variant="h2" fontWeight="700" noWrap sx={{pl: 0.5, pb: 1.25}}>
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: theme.palette.OCEAN_N.main,
                borderRadius: "16px",
              }}
              sx={{
                px: 2,
                py: 2
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {/* <EmojiEventsRoundedIcon sx={{ color: theme.palette.secondary[900] }}/> */}
                <Typography color="#ffffff" variant="caption" fontWeight="700" sx={{pl: 0.25}}>
                  Neuroticism
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                <Typography color="#ffffff" fontSize="42pt" fontWeight="900" sx={{ letterSpacing: -2 }}>
                  {loading ?
                    <CircularProgress />
                    : rank[4]
                  }
                </Typography>
                <Typography color="#ffffff" variant="h2" fontWeight="700" noWrap sx={{pl: 0.5, pb: 1.25}}>
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                background: theme.palette.grey[700],
                borderRadius: "16px",
              }}
              sx={{
                px: 2, py: 2, mb: 1
              }}
            >
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                {/* <EmojiEventsRoundedIcon sx={{ color: theme.palette.secondary[900] }}/> */}
                <Typography color="#ffffff" variant="caption" fontWeight="700" sx={{pl: 0.25}}>
                  Overall
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
                <Typography color="#ffffff" fontSize="42pt" fontWeight="900" sx={{ letterSpacing: -2 }}>
                  {loading ?
                    <CircularProgress />
                    : rank[5]
                  }
                </Typography>
                <Typography color="#ffffff" variant="h2" fontWeight="700" noWrap sx={{pl: 0.5, pb: 1.25}}>
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      
      </Grid>
    </>
  )
}
export default ShowChart