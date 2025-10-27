import { Component } from '@angular/core';
import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { KitchenSinkComponent } from '../kitchen-sink/kitchen-sink.component';
import { AttributeComponent } from '../attribute/attribute.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, ConfigurationComponent, KitchenSinkComponent, AttributeComponent]
})
export class ExamplesComponent {
  public config = environment;
}
