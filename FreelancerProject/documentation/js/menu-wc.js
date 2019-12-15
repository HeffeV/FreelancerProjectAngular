'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">freelancer-project documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-44a60af5dfd49cc6c132176e4f77b5f5"' : 'data-target="#xs-components-links-module-AppModule-44a60af5dfd49cc6c132176e4f77b5f5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-44a60af5dfd49cc6c132176e4f77b5f5"' :
                                            'id="xs-components-links-module-AppModule-44a60af5dfd49cc6c132176e4f77b5f5"' }>
                                            <li class="link">
                                                <a href="components/AccountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddCompanyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddCompanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailCompanyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailCompanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditCompanyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditCompanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BrowseAssignmentModule.html" data-type="entity-link">BrowseAssignmentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BrowseAssignmentModule-5336cdc50f7ad9883e48dde43e72f1b7"' : 'data-target="#xs-components-links-module-BrowseAssignmentModule-5336cdc50f7ad9883e48dde43e72f1b7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BrowseAssignmentModule-5336cdc50f7ad9883e48dde43e72f1b7"' :
                                            'id="xs-components-links-module-BrowseAssignmentModule-5336cdc50f7ad9883e48dde43e72f1b7"' }>
                                            <li class="link">
                                                <a href="components/BrowseAssignmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BrowseAssignmentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-1a19dbc5a4a868a23b2c64182336b240"' : 'data-target="#xs-components-links-module-DashboardModule-1a19dbc5a4a868a23b2c64182336b240"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-1a19dbc5a4a868a23b2c64182336b240"' :
                                            'id="xs-components-links-module-DashboardModule-1a19dbc5a4a868a23b2c64182336b240"' }>
                                            <li class="link">
                                                <a href="components/AddAssignmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardRecruiterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardRecruiterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailAssignmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAssignmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageassignmentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageassignmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagecompaniesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManagecompaniesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagereviewsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManagereviewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageskillsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageskillsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagetagsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManagetagsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageusersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageusersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RxFormModule.html" data-type="entity-link">RxFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RxFormModule-f7a89a99e5ca3b104519c7730f2de1a9"' : 'data-target="#xs-components-links-module-RxFormModule-f7a89a99e5ca3b104519c7730f2de1a9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RxFormModule-f7a89a99e5ca3b104519c7730f2de1a9"' :
                                            'id="xs-components-links-module-RxFormModule-f7a89a99e5ca3b104519c7730f2de1a9"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Assignment.html" data-type="entity-link">Assignment</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssignmentFilterModel.html" data-type="entity-link">AssignmentFilterModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link">Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompanyFilterModel.html" data-type="entity-link">CompanyFilterModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContactInfo.html" data-type="entity-link">ContactInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterModel.html" data-type="entity-link">FilterModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterReviewModel.html" data-type="entity-link">FilterReviewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Location.html" data-type="entity-link">Location</a>
                            </li>
                            <li class="link">
                                <a href="classes/Review.html" data-type="entity-link">Review</a>
                            </li>
                            <li class="link">
                                <a href="classes/Skill.html" data-type="entity-link">Skill</a>
                            </li>
                            <li class="link">
                                <a href="classes/Status.html" data-type="entity-link">Status</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tag.html" data-type="entity-link">Tag</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagAssignment.html" data-type="entity-link">TagAssignment</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagCompany.html" data-type="entity-link">TagCompany</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagUser.html" data-type="entity-link">TagUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAssignment.html" data-type="entity-link">UserAssignment</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCompany.html" data-type="entity-link">UserCompany</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserFilterModel.html" data-type="entity-link">UserFilterModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLogin.html" data-type="entity-link">UserLogin</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSkill.html" data-type="entity-link">UserSkill</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserType.html" data-type="entity-link">UserType</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link">AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssignmentService.html" data-type="entity-link">AssignmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticateService.html" data-type="entity-link">AuthenticateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BrowseAssignmentService.html" data-type="entity-link">BrowseAssignmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanyService.html" data-type="entity-link">CompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountryService.html" data-type="entity-link">CountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link">HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewService.html" data-type="entity-link">ReviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SkillService.html" data-type="entity-link">SkillService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagService.html" data-type="entity-link">TagService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserserviceService.html" data-type="entity-link">UserserviceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});