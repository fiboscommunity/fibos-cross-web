import React, { PureComponent } from 'react'
import classnames from 'classnames'

import styles from './MainPage.module.css'
import expectationsStyles from './Expectations.module.css'

import { mainPageConfig } from 'Config'

import leftRect from 'Assets/left_rect.png'
import rightRect from 'Assets/right_rect.png'

const { banner, info1, info2, advantages, expectations } = mainPageConfig

class Banner extends PureComponent {
	render() {
		const { label, label_translate } = banner

		return (
			<div className={styles.bannerContainer}>
				<div className={styles.bannerLabelWrapper}>
					<div className={styles.bannerLabel}>{label}</div>
					<div className={styles.bannerTranslate}>{label_translate}</div>
				</div>
			</div>
		)
	}
}

class Info1 extends PureComponent {
	render() {
		const { content, backgroundImg, picData } = info1

		return (
			<div className={styles.info1Container}>
				<img className={styles.infoBgImg} src={backgroundImg} alt="" />
				<div className={styles.infoImgWrapper}>
					<img className={styles.infoImg} src={picData} alt="" />
				</div>
				<div className={styles.infoContext}>
					<div className={styles.infoContentWrapper}>
						<div className={styles.infoContent}>{content}</div>
					</div>
				</div>
			</div>
		)
	}
}

class Info2 extends PureComponent {
	render() {
		const { content, tips, backgroundImg, picData } = info2

		return (
			<div className={styles.info2Container}>
				<img className={styles.infoBgImg} src={backgroundImg} alt="" />
				<div className={styles.infoImgWrapper}>
					<img className={styles.infoImg} src={picData} alt="" />
				</div>
				<div className={styles.infoContext}>
					<div className={styles.infoContentWrapper}>
						<div className={styles.infoContent}>{content}</div>
						<div className={styles.infoTips}>{tips}</div>
					</div>
				</div>
			</div>
		)
	}
}

class Title extends PureComponent {
	render() {
		const { data } = this.props

		return (
			<div className={styles.titleContainer}>
				<div className={styles.titleWrapper}>
					<div className={styles.titleDecorate}>
						<img className={styles.leftRect} src={leftRect} alt="" />
					</div>
					<div className={styles.titleContextWrapper}>
						<div className={styles.titleContext}>{data}</div>
					</div>
					<div className={styles.titleDecorate}>
						<img className={styles.rightRect} src={rightRect} alt="" />
					</div>
				</div>
			</div>
		)
	}
}

class Card extends PureComponent {
	render() {
		const { type, label, picData, content, customStyle } = this.props

		return (
			<div className={classnames(styles.cardContainer, customStyle.cardContainer)}>
				{type === 'info' && [
					<div className={classnames(styles.cardImgWrapper, customStyle.cardImgWrapper)} key="img">
						<img className={classnames(styles.cardImg, customStyle.cardImg)} src={picData} alt="" />
					</div>,
					<div className={classnames(styles.cardContextWrapper, customStyle.cardContextWrapper)} key="label">
						<div className={classnames(styles.cardLabel, customStyle.cardLabel)}>{label}</div>
						<div className={classnames(styles.cardContext, customStyle.cardContext)}>{content}</div>
					</div>
				]}

				{type !== 'info' && (
					<div className={classnames(styles.cardContextWrapper_notInfo, customStyle.cardContextWrapper_notInfo)}>
						<div className={classnames(styles.cardLabel_notInfo, customStyle.cardLabel_notInfo)}>{label}</div>
					</div>
				)}
			</div>
		)
	}
}

class Advantages extends PureComponent {
	render() {
		const { label, data, backgroundImg } = advantages

		return (
			<div className={styles.advantagesContainer}>
				<img className={styles.advantagesBgImg} src={backgroundImg} alt="" />
				<Title data={label} />
				<div className={styles.advantagesCardsWrapper}>
					{data.map((item, index) => {
						const { type, label, picData, content } = item

						return <Card key={index} type={type} label={label} picData={picData} content={content} customStyle={{}} />
					})}
				</div>
			</div>
		)
	}
}

class Expectations extends PureComponent {
	render() {
		const { label, data, backgroundImg } = expectations

		return (
			<div className={styles.expectationsContainer}>
				<img className={styles.expectationsBgImg} src={backgroundImg} alt="" />
				<Title data={label} />
				<div className={styles.expectationsCardsWrapper}>
					{data.map((item, index) => {
						const { type, label, picData, content } = item

						return <Card key={index} type={type} label={label} picData={picData} content={content} customStyle={expectationsStyles} />
					})}
				</div>
			</div>
		)
	}
}

class MainPage extends PureComponent {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.chapter}>
					<Banner />
				</div>
				<div className={styles.chapter}>
					<Info1 />
				</div>
				<div className={styles.chapter}>
					<Info2 />
				</div>
				<div className={styles.chapter}>
					<Advantages />
				</div>
				<div className={styles.chapter}>
					<Expectations />
				</div>
			</div>
		)
	}
}

export default MainPage
