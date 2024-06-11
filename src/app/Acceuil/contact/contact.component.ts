import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact/contact.service';
import { Contact } from '../../models/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent  implements OnInit {
  contact: Contact | undefined;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getcontact().subscribe(data => {
      if (data.length > 0) {
        this.contact = data[0];
      }
    });
  }

}
