import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectsFormComponent } from './projects-form/projects-form.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { AboutCardComponent } from './about-card/about-card.component';
import { StudiesComponent } from './studies/studies.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillCardComponent } from './skill-card/skill-card.component';
import { SkillsComponent } from './skills/skills.component';
import { StudyCardComponent } from './study-card/study-card.component';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { AboutFormComponent } from './about-form/about-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    AboutComponent,
    BlogComponent,
    LoginComponent,
    ErrorComponent,
    NavigationBarComponent,
    ProjectCardComponent,
    ProjectsFormComponent,
    BlogPostComponent,
    AboutCardComponent,
    StudiesComponent,
    ExperienceComponent,
    SkillCardComponent,
    SkillsComponent,
    StudyCardComponent,
    ExperienceCardComponent,
    DeleteModalComponent,
    BlogFormComponent,
    SkillFormComponent,
    AboutFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
