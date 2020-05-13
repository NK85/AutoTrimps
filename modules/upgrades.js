//Helium

var upgradeList = ['Miners', 'Scientists', 'Coordination', 'Speedminer', 'Speedlumber', 'Speedfarming', 'Speedscience', 'Speedexplorer', 'Megaminer', 'Megalumber', 'Megafarming', 'Megascience', 'Efficiency', 'TrainTacular', 'Trainers', 'Explorers', 'Blockmaster', 'Battle', 'Bloodlust', 'Bounty', 'Egg', 'Anger', 'Formations', 'Dominance', 'Barrier', 'UberHut', 'UberHouse', 'UberMansion', 'UberHotel', 'UberResort', 'Trapstorm', 'Gigastation', 'Shieldblock', 'Potency', 'Magmamancers'];

function buyUpgrades() {

    for (var upgrade in upgradeList) {
        upgrade = upgradeList[upgrade];
        var gameUpgrade = game.upgrades[upgrade];
        var available = (gameUpgrade.allowed > gameUpgrade.done && canAffordTwoLevel(gameUpgrade));
	var fuckbuildinggiga = (bwRewardUnlocked("AutoStructure") == true && game.talents.deciBuild.purchased && getPageSetting('hidebuildings')==true && getPageSetting('BuyBuildingsNew')==0);
		
	//Coord & Amals
	if (upgrade == 'Coordination' && (getPageSetting('BuyUpgradesNew') == 2 || !canAffordCoordinationTrimps())) continue;
	if (upgrade == 'Coordination' && getPageSetting('amalcoord')==true) {
		var shouldAmal = calcHDratio() < getPageSetting('amalcoordhd') || getPageSetting('amalcoordhd') < 0;
		var shouldAmal = shouldAmal && (game.global.world < getPageSetting('amalcoordz') || getPageSetting('amalcoordz') < 0);
		var shouldAmal = shouldAmal && (getPageSetting('amalcoordt') > game.jobs.Amalgamator.owned || getPageSetting('amalcoordt') < 0);
		var shouldAmal = shouldAmal && ((game.resources.trimps.realMax() / game.resources.trimps.getCurrentSend()) < 1300);
		if(shouldAmal) continue;
	}
	
	//WS
	if (
	    upgrade == 'Coordination' && getEmpowerment() == "Wind" && 
	    (
		(getPageSetting('AutoStance') == 3 && game.global.challengeActive != "Daily" && getPageSetting('WindStackingMin') > 0 && game.global.world >= getPageSetting('WindStackingMin') && calcHDratio() < 5) || 
		(getPageSetting('use3daily') == true && game.global.challengeActive == "Daily" && getPageSetting('dWindStackingMin') > 0 && game.global.world >= getPageSetting('dWindStackingMin') && calcHDratio() < 5)
	    )
	) continue;
	
	if (
	    upgrade == 'Coordination' && 
	    (
		(getPageSetting('AutoStance') == 3 && game.global.challengeActive != "Daily" && getPageSetting('wsmax') > 0 && getPageSetting('wsmaxhd') > 0 && game.global.world >= getPageSetting('wsmax') && calcHDratio() < getPageSetting('wsmaxhd')) || 
		(getPageSetting('use3daily') == true && game.global.challengeActive == "Daily" && getPageSetting('dwsmax') > 0 && getPageSetting('dwsmaxhd') > 0 && game.global.world >= getPageSetting('dwsmax') && calcHDratio() < getPageSetting('dwsmaxhd'))
	    )
	) continue;

	//Other
        if (upgrade == 'Shieldblock' && !getPageSetting('BuyShieldblock')) continue;
        if (upgrade == 'Gigastation' && !fuckbuildinggiga && getPageSetting('GigastationTarget') == -1 && (game.global.lastWarp ? game.buildings.Warpstation.owned < (Math.floor(game.upgrades.Gigastation.done * getPageSetting('DeltaGigastation')) + getPageSetting('FirstGigastation')) : game.buildings.Warpstation.owned < getPageSetting('FirstGigastation'))) continue;
        if (upgrade == 'Gigastation' && getPageSetting('GigastationTarget') >= 0) {
		var gigaAmt = 0;
		var gigaTarget = getPageSetting('GigastationTarget');
		gigaAmt += Math.floor((gigaTarget - 60) > 10 ? 10 : ((gigaTarget - 60) > 0 ? (gigaTarget - 60) : 0));
		gigaAmt += Math.floor(((gigaTarget - 70) / 2) > 4 ? 4 : (((gigaTarget - 70) / 2) > 0 ? ((gigaTarget - 70) / 2) : 0));
		gigaAmt += Math.floor(((gigaTarget - 78) / 3) > 4 ? 4 : (((gigaTarget - 78) / 3) > 0 ? ((gigaTarget - 78) / 3) : 0));
		gigaAmt += Math.floor(((gigaTarget - 90) / 5) > 16 ? 16 : (((gigaTarget - 90) / 5) > 0 ? ((gigaTarget - 90) / 5) : 0));
		gigaAmt += Math.floor(((gigaTarget - 170) / 10) > 5 ? 5 : (((gigaTarget - 170) / 10) > 0 ? ((gigaTarget - 170) / 10) : 0));
		var gigaDelta = (gigaTarget - 60) / gigaAmt;
        	var gigasFinal = Math.floor((game.global.world - 60) / gigaDelta);
		if (game.upgrades.Gigastation.done >= gigasFinal) continue;
	}
	if (upgrade == 'Bloodlust' && game.global.challengeActive == 'Scientist' && getPageSetting('BetterAutoFight')) continue;

        if (!available) continue;
        if (game.upgrades.Scientists.done < game.upgrades.Scientists.allowed && upgrade != 'Scientists') continue;
        buyUpgrade(upgrade, true, true);
        debug('Upgraded ' + upgrade, "upgrades", "*upload2");
    }
}

//Radon

var RupgradeList = ['Miners', 'Scientists', 'Coordination', 'Speedminer', 'Speedlumber', 'Speedfarming', 'Speedscience', 'Speedexplorer', 'Megaminer', 'Megalumber', 'Megafarming', 'Megascience', 'Efficiency', 'Explorers', 'Battle', 'Bloodlust', 'Bounty', 'Egg', 'Rage', 'Prismatic', 'Prismalicious', 'Formations', 'Dominance', 'UberHut', 'UberHouse', 'UberMansion', 'UberHotel', 'UberResort', 'Trapstorm', 'Potency'];

function RbuyUpgrades() {

    for (var upgrade in RupgradeList) {
        upgrade = RupgradeList[upgrade];
        var gameUpgrade = game.upgrades[upgrade];
        var available = (gameUpgrade.allowed > gameUpgrade.done && canAffordTwoLevel(gameUpgrade));
			
        //Coord
	if (upgrade == 'Coordination' && (getPageSetting('RBuyUpgradesNew') == 2 || !canAffordCoordinationTrimps())) continue;

        //Other
        if (!available) continue;
        if (game.upgrades.Scientists.done < game.upgrades.Scientists.allowed && upgrade != 'Scientists') continue;
            buyUpgrade(upgrade, true, true);
            debug('Upgraded ' + upgrade, "upgrades", "*upload2");
        }
}
