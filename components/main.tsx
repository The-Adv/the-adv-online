"use client"

import React from "react";
import WelcomePage from "@/pages/welcome-page";
import ScenarioPage from "@/pages/scenario-page";
import DifficultyPage from "@/pages/difficulty-page";
import AftermathPage from "@/pages/aftermath-page";
import ConfirmPage from "@/pages/confirm-page";
import EndPage from "@/pages/end-page";
import ControllerPage from "@/pages/controller-page";
import HelpPage from "@/pages/help-page";
import HintPage from "@/pages/hint-page";
import NamesPage from "@/pages/names-page";
import PledgePage from "@/pages/pledge-page";
import QuestionsPage from "@/pages/questions-page";
import RolesPage from "@/pages/roles-page";
import SidesPage from "@/pages/sides-page";
import StrategyPage from "@/pages/strategy-page";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { useSession } from "@/context/session";
import { ref, set } from "firebase/database";

export default function Main() {

    const pages: { [key: string]: React.ReactNode } = {
        'welcome': React.createElement(WelcomePage),
        'aftermath': React.createElement(AftermathPage),
        'confirm': React.createElement(ConfirmPage),
        'controller': React.createElement(ControllerPage),
        'difficulty': React.createElement(DifficultyPage),
        'end': React.createElement(EndPage),
        'help': React.createElement(HelpPage),
        'hint': React.createElement(HintPage),
        'names': React.createElement(NamesPage),
        'pledge': React.createElement(PledgePage),
        'questions': React.createElement(QuestionsPage),
        'roles': React.createElement(RolesPage),
        'scenario': React.createElement(ScenarioPage),
        'sides': React.createElement(SidesPage),
        'strategy': React.createElement(StrategyPage)
    };

    const database = useDatabase();
    const { sessionId } = useSession();
    const currentPageRef = ref(database, `sessions/${sessionId}/currentPage`);

    const { status, data: currentPage } = useDatabaseObjectData<string>(currentPageRef);

    if (status === 'loading') {
        return <span>loading...</span>;
    }

    if (!currentPage) {
        set(currentPageRef, 'welcome')
    }

    return (
        <main >{pages[currentPage]}</main>
    );
}